import feathers from 'feathers-client'
import io from 'socket.io-client'


class API {
  constructor(){
    const socket = io('http://localhost:3030')
    this.app = feathers()
    .configure(feathers.socketio(socket))
    .configure(feathers.hooks())
    .configure(feathers.authentication({
      type: 'local',
      storage: window.localStorage,
    }))
  }
  service(serviceName){
    return this.app.service(serviceName)
  }
  authenticate(user){
    const { email, password} = user
    return this.app.authenticate(
      Object.assign({}, {type:'local'}, {
        email,
        password,
      })
    )
  }
  signOut(){
    return this.app.logout()
  }
}

export default API
