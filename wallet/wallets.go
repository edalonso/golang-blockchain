package wallet

import(
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

const walletFile = "./tmp/wallets.data"

type Wallets struct {
	Address []string
}

func (ws *Wallets) AddWallet() string {
	wallet := MakeWallet()
	address := fmt.Sprintf("%s", wallet.Address())

	ws.Address = append(ws.Address, address)

	return address
}

func CreateWallets() (*Wallets, error) {
	wallets := Wallets{}
	err := wallets.LoadFile()

	return &wallets, err
}

func (ws Wallets) GetWallet(address string) Wallet {
	return *LoadWallet(address)
}

func (ws *Wallets) GetAllAddresses() []string {
	return ws.Address
}

func (ws *Wallets) LoadFile() error {
	if _, err := os.Stat(walletFile); os.IsNotExist(err) {
		return err
	}

	fileContent, err := ioutil.ReadFile(walletFile)
	if err != nil {
		log.Fatal("Error during read wallet file: ", err)
	}
	lines := strings.Split(string(fileContent), ",")

	ws.Address = lines

	return nil
}

func (ws *Wallets) SaveFile() {
	file, err := os.Create(walletFile)
	if err != nil {
		log.Fatal("Unable to create wallet file: ", err)
	}
	defer file.Close()
	//fmt.Println(item)
	_, err = file.WriteString(strings.Join(ws.Address, ","));
	//file.Write([]byte(item)); 
	if err != nil {
		//fmt.Println("debug")
		log.Fatal("Error during write wallet file: ", err)
	}
}
