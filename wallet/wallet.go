package wallet

import (
	"bytes"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"log"

	"golang.org/x/crypto/ripemd160"
	"path/filepath"
	"os"
	"crypto/x509"
	"encoding/pem"
)

const (
	checksumLength = 4
	//hexadecimal representation of 0
	version = byte(0x00)
	walletsPath = "./tmp/"
)

type Wallet struct {
	//ecdsa = eliptical curve digital signiture algorithm
	PrivateKey ecdsa.PrivateKey
	PublicKey  []byte
}

func NewKeyPair() (ecdsa.PrivateKey, []byte) {
	curve := elliptic.P256()

	private, err := ecdsa.GenerateKey(curve, rand.Reader)
	if err != nil {
		log.Panic(err)
	}

	pub := append(private.PublicKey.X.Bytes(), private.PublicKey.Y.Bytes()...)

	return *private, pub
}

func MakeWallet() *Wallet {
	privateKey, publicKey := NewKeyPair()
	wallet := Wallet{privateKey, publicKey}
	wallet.Save()
	return &wallet
}

func PublicKeyHash(publicKey []byte) []byte {
	hashedPublicKey := sha256.Sum256(publicKey)

	hasher := ripemd160.New()
	_, err := hasher.Write(hashedPublicKey[:])
	if err != nil {
		log.Panic(err)
	}
	publicRipeMd := hasher.Sum(nil)

	return publicRipeMd
}

func Checksum(ripeMdHash []byte) []byte {
	firstHash := sha256.Sum256(ripeMdHash)
	secondHash := sha256.Sum256(firstHash[:])

	return secondHash[:checksumLength]
}

func (w *Wallet) Address() []byte {
	pubHash := PublicKeyHash(w.PublicKey)

	versionedHash := append([]byte{version}, pubHash...)

	checksum := Checksum(versionedHash)

	finalHash := append(versionedHash, checksum...)
	address := base58Encode(finalHash)

	return address
}

func ValidateAddress(address string) bool {
	pubKeyHash := base58Decode([]byte(address))
	actualChecksum := pubKeyHash[len(pubKeyHash)-checksumLength:]
	version := pubKeyHash[0]
	pubKeyHash = pubKeyHash[1 : len(pubKeyHash)-checksumLength]
	targetChecksum := Checksum(append([]byte{version}, pubKeyHash...))

	return bytes.Compare(actualChecksum, targetChecksum) == 0
}

func (w *Wallet) Save() {
	filename := filepath.Join(walletsPath, string(w.Address())+".wlt")

	privKeyBytes, err := x509.MarshalECPrivateKey(&w.PrivateKey)
	if err != nil {
		log.Panic(err)
	}

	privKeyFile, err := os.Create(filename)
	if err != nil {
		log.Panic(err)
	}

	err = pem.Encode(privKeyFile, &pem.Block{
		// Type:  "EC PRIVATE KEY",
		Bytes: privKeyBytes,
	})
	if err != nil {
		log.Panic(err)
	}

	privKeyFile.Close()
}

func LoadWallet(address string) *Wallet {
	filename := filepath.Join(walletsPath, address+".wlt")
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		log.Panic(err)
	}
	privKeyFile, err := os.ReadFile(filename)
	if err != nil {
		log.Panic(err)
	}

	pemBlock, _ := pem.Decode(privKeyFile)
	if err != nil {
		log.Panic(err)
	}

	privKey, err := x509.ParseECPrivateKey(pemBlock.Bytes)
	if err != nil {
		log.Panic(err)
	}

	publicKey := append(privKey.PublicKey.X.Bytes(), privKey.PublicKey.Y.Bytes()...)
	return &Wallet{
		PrivateKey: *privKey,
		PublicKey:  publicKey,
	}
}
