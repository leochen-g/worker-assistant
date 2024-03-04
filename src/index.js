import {WechatyBuilder} from '@juzi/wechaty'
import {WechatyWebPanelPlugin} from 'wechaty-web-panel'
import {PuppetWhatsapp} from '@juzi/wechaty-puppet-whatsapp'

const name = 'worker-assistant';
let bot = '';
let workProToken = '' // 如果申请了企业微信的token 可以直接填入
if (process.env.IS_WHATSAPP) {
    console.log('读取到环境变量中启用了WhatsApp')
    const name = 'whatsapp-assistant';
    const puppet = new PuppetWhatsapp()
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet
    });
} else if (process.env['WORK_PRO_TOKEN']) {
    console.log('读取到环境变量中的企微token')
    workProToken = process.env['WORK_PRO_TOKEN']
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: '@juzi/wechaty-puppet-service',
        puppetOptions: {
            authority: 'token-service-discovery-test.juzibot.com',
            tls: {disable: true},
            token: workProToken
        },
    });
}


bot.use(WechatyWebPanelPlugin({
    apiKey: '***', apiSecret: '***',
}))
bot.start()
    .catch((e) => console.error(e));
