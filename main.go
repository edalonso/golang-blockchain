package main

import (
	"blockchain.com/cli"
	"os"
)

// @title Disashop Blockchain Management API
// @version 1.0
// @description Manage Blockchain

// @contact.name Disashop
// @contact.url https://disashop.com
// @contact.email eduardo.alonso@disashop.com

// @host blockchain.dsboxlab.com
// @BasePath /api/v1
func main() {
	defer os.Exit(0)

	cmd := cli.CommandLine{}
	cmd.Run()
}
