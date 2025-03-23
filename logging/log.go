package logging

import (
	log "github.com/sirupsen/logrus"
	"net/http"
	"github.com/labstack/echo/v4"
)

var (
	LogLevel string
	Sm = NewTTLMap(1000)
)

func init() {
	log.SetFormatter(customLogger{
		formatter:    log.TextFormatter{FieldMap: log.FieldMap{
			"msg": "message",
		}},
	})
}

func (l customLogger) Format(entry *log.Entry) ([]byte, error) {
	if (entry.Context != nil) {
		if str, ok := entry.Context.Value("session-id").(string); ok {
			entry.Data["sessionID"] = Sm.Get(str)
		}
	}
	return l.formatter.Format(entry)
}

func ChangeLogLevel(level string, c echo.Context) error {
	switch level {
	case "Info":
		log.SetLevel(log.InfoLevel)
		log.Debug("Change log level to Info")
	case "Trace":
		log.SetLevel(log.TraceLevel)
		log.Debug("Change log level to Trace")
	case "Debug":
		log.SetLevel(log.DebugLevel)
		log.Debug("Change log level to Debug")
	case "Warn":
		log.SetLevel(log.WarnLevel)
		log.Debug("Change log level to Warn")
	case "Error":
		log.SetLevel(log.ErrorLevel)
		log.Debug("Change log level to Error")
	default:
		log.Warn("Level not supported")
		return c.JSON(http.StatusBadRequest, "Level not supported ;)")
	}
	log.Info("Changed log level")
	LogLevel = level

	return c.JSON(http.StatusOK, "Changed log level!")
}
