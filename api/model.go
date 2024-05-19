package api

type Balance struct {
	Address   string
	Balance   int
}

type SendTransaction struct {
	From      string
	To        string
	Wallet    string
	Amount    int
	MineNow      bool
}

type LoggingLevel struct {
	Level string `json:"level" validate:"required,oneof=Trace Debug Info Warning Error Fatal Panic"`
}

type ControlChan = chan struct{}
