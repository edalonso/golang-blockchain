package api

type Balance struct {
	Address   string
}

type Wallet struct {
	Address   string
	Node      string
}

type SendTransaction struct {
	From      string
	To        string
	Amount    int
	MineNow   bool `default:"false"`
}

type LoggingLevel struct {
	Level string `json:"level" validate:"required,oneof=Trace Debug Info Warning Error Fatal Panic"`
}

type ControlChan = chan struct{}
