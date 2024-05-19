/*
 * Blockchain API
 *
 * Blockchain-API can attend different kind of request to manage blockchain
 *
 * API version: 1.0.0
 * Contact: eduardo.alonso@disashop.com
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */

package api

import (
	"net/http"
	"context"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/swaggo/echo-swagger"
	log "github.com/sirupsen/logrus"
	_ "blockchain.com/docs"
	"github.com/go-playground/validator/v10"
	"regexp"
)

var (
	validate *validator.Validate
	passwordString = "^[a-zA-Z0-9]*|[!@#$%^&*()_+-=[]}|:,./<>?]*$" // Regexp to avoid ; and \t\r\n to mitigate sql injection
	passwordRegex  = regexp.MustCompile(passwordString)
	//Create map to the current token to identify session in logs
)

func StartBackgroundServer(ctx context.Context) (string, ControlChan, error) {
	validate = validator.New(validator.WithRequiredStructEnabled())
	validate.RegisterValidation("regpwd", func(fl validator.FieldLevel) bool {
		return passwordRegex.MatchString(fl.Field().String())
	})

	routes:= NewRoute()
	address:= "0.0.0.0:1323"

	done := make(ControlChan)
	server := &http.Server{
		Addr:    address,
		Handler: routes,
	}

	go func() {
		<-ctx.Done()
		err := server.Shutdown(context.Background())
		if err != nil {
			log.Warnf("Had problems shutting down the server: %s", err)
		}
		log.Infof("Web server has been shut down.")
	}()

	go func() {
		err := server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			log.Warnf("Looks like port is busy for %s", address)
			panic(err)
		}
		done <- struct{}{}
	}()

	return "http://" + address, done, nil
}

func NewRoute() *echo.Echo {
	e := echo.New()

	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogStatus: true,
		LogURI:    true,
		LogMethod: true,
		LogError:  true,
		LogRequestID: true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			// FIXME: latency measurement always reports zero
			if v.URI == "/api/v1/health"{
				log.WithFields(log.Fields{
					"URI":   v.URI,
					"status": v.Status,
					"resquestID": v.RequestID,
					"Latency": v.Latency.String(),
					"Method": v.Method,
				}).Debug("request")
			} else if v.Status < 400 && v.Error == nil {
				log.WithFields(log.Fields{
					"URI":   v.URI,
					"status": v.Status,
					"resquestID": v.RequestID,
					"Latency": v.Latency.String(),
					"Method": v.Method,
				}).Info("request")
			} else {
				log.WithFields(log.Fields{
					"URI":   v.URI,
					"status": v.Status,
					"resquestID": v.RequestID,
					"Latency": v.Latency.String(),
					"Method": v.Method,
					"Error": v.Error,
				}).Warn("request")
			}
			return nil
		},
	}))

	e.GET("/", func(c echo.Context) error {
		readAllCookies(c)
		readAuthorizationHeader(c)
		return c.String(http.StatusOK, "API is running!")
	})

	// Define the routes
	e.GET("/swagger/*", echoSwagger.WrapHandler)
	e.GET("/api/v1/health", healthCheck)
	e.GET("/api/v1/getbalance", getBalance)
        e.POST("/api/v1/sendtransaction", send)

	return e
}