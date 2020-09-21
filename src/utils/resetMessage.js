
import { Message} from 'element-ui';
import Vue from 'vue'

var goBackEntity = new Vue({});
export default goBackEntity;

// let messageInstance = null;
// const resetMessage = (options) => {
//     if(messageInstance) {
//         messageInstance.close()
//     }
//     messageInstance = Message(options)
// };

const resetMessage = options => {
    return Message({
      ...options,
      offset: 6,
      showClose: true,
      duration: 1200
    });
  };

['error','success','info','warning'].forEach(type => {
    resetMessage[type] = options => {
        if(typeof options === 'string') {
            options = {
                message:options
            }
        }
        options.type = type
        return resetMessage(options)
    }
})
export const message = resetMessage





