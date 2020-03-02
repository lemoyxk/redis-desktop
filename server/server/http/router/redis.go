/**
* @program: server
*
* @description:
*
* @author: lemo
*
* @create: 2019-12-31 13:07
**/

package router

import (
	"github.com/Lemo-yxk/lemo"

	"server/server/http/controller/redis"
	"server/server/http/middleware/before"
)

func RedisRouter(server *lemo.HttpServerRouter) {
	server.Group("/Redis").Before(before.Redis).Handler(func(handler *lemo.HttpServerRouteHandler) {
		handler.Post("/DB/scan").Handler(redis.DB.Scan)
		handler.Post("/DB/select").Handler(redis.DB.Select)
	})

	server.Group("/Redis").Before(before.Redis, before.Key).Handler(func(handler *lemo.HttpServerRouteHandler) {
		handler.Post("/Key/type").Handler(redis.Key.Type)
		handler.Post("/Key/do").Handler(redis.Key.Do)
	})

	server.Group("/Redis").Handler(func(handler *lemo.HttpServerRouteHandler) {
		handler.Post("/Register/cluster").Handler(redis.Register.Cluster)
		handler.Post("/Register/normal").Handler(redis.Register.Normal)
	})
}
