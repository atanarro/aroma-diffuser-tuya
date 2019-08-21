This script uses [codetheweb/tuyapi](https://github.com/codetheweb/tuyapi) to control a Tuya compatible Aroma Diffuser.

![Aroma diffuser](https://images.tuyaeu.com/smart/product_icon2/jsq_1.png)

## How to use

1. Add the device to the Tuya Smart app
2. `npm i`
3. `cp device_settings.json.copy device_settings.json` and change with your values (you can get them with a traffic capture like [NetCapture](https://play.google.com/store/apps/details?id=com.minhui.networkcapture))
4. to power on mist and colors `DEBUG=aroma-diffuser npm start -- powerOn colorful`
5. to power off mist and color: `DEBUG=aroma-diffuser npm start -- powerOff no_color`
