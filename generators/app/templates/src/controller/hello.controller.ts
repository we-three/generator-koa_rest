import { Controller, Get, Post, useMiddleware } from '@sundial/koa_rest'
import { Context } from 'koa'

@Controller('/hello')
class HelloController {
  @Get('/world')
  testGet(ctx) {
    ctx.body = 'hello world'
  }

  @Post('/post')
  testPost(ctx: Context) {
    ctx.body = 'post'
  }
}

export default HelloController
