package logging
//TODO review https://pkg.go.dev/sync#Map in order to use a concurrent core design
import (
	"sync"
	"time"
)

type item struct {
	value      string
	lastAccess int64
}

type TTLMap struct {
	m map[string]*item
	l sync.Mutex
}

func NewTTLMap(ln int) (m *TTLMap) {
	m = &TTLMap{m: make(map[string]*item, ln)}
	return
}

func (m *TTLMap) Set(k, v string, maxTTL int64) {
	m.l.Lock()
	it, ok := m.m[k]
	//If not exists insert value in TTLMap
	if !ok {
		it = &item{value: v}
		m.m[k] = it
	}
	go func() {
		select {
		case <-time.After(time.Duration(maxTTL) * time.Second):
			delete(m.m, k)
		}
	}()
	it.lastAccess = time.Now().Unix()
	m.l.Unlock()
}

func (m *TTLMap) Get(k string) (v string) {
	m.l.Lock()
	if it, ok := m.m[k]; ok {
		v = it.value
		it.lastAccess = time.Now().Unix()
	}
	m.l.Unlock()
	return
}
