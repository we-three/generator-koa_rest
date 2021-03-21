import 'module-alias/register'
import Koa from 'koa'
import KoaBody from 'koa-body'
import Dotenv from 'dotenv'
import HelloController from './controller/hello.controller'
import { Config, Application } from '@sundial/koa_rest'

@Config({
  // @ts-ignore
  controllers: [ HelloController],
})
class MyApp extends Application {
  async main() {
    const envPath = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'
    Dotenv.config({ path: envPath })

    <%  if (useMongodb) { %>
    await configDb() 
        <% } %>
    this.app.use(KoaBody())
    this.start(() => {
      console.log(`app stared on ${this.port}`)
    })
  }
}

MyApp.run()

<% if (useMongodb) { %>
async function configDb() {
  await mongoose.connect(process.env[MONGODB_URI], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.info('mongo db connected.')
}
<% } %>