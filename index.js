const debug = require('debug')('aroma-diffuser');
const yargs = require('yargs');

const TuyAPI = require('tuyapi');

const device = new TuyAPI(require('./device_settings.json'));

const commands = {
  powerOff: {2: '1'},
  powerOn: {2: '2'},
  powerOnIntermitent: {2: '3'},
  powerOnCountdown: {2: '4'},

  time_6h: { 4: 360 },
  time_3h: { 4: 180 },
  time_1h: { 4: 60 },

  no_color: {6: 'close'},
  colorful: {6: 'colorful'},
  color_white: {6: 'white'},
  // color_orange: ???
  
  brightness_max: {7: 255},
  brightness_min: {7: 0},

  // 8 power consumtion ?
  // 9 ???

  small_mist: { 101: '1' },
  big_mist: { 101: '2' },
};

commands['off'] = Object.assign({}, commands.powerOff, commands.no_color);
commands['on'] = Object.assign({}, commands.powerOn, commands.big_mist, commands.colorful);

const argv = yargs.argv;

// Find device on network
device.find().then(() => {
  // Connect to device
  device.connect();
});

// Add event listeners
device.on('connected', () => {
  debug('Connected to device!');
});

device.on('disconnected', () => {
  debug('Disconnected from device.');
});

device.on('error', error => {
  debug('Error!', error);
});

device.on('data', data => {
  debug(`Data received: ${JSON.stringify(data)}`);

  device.set({
    multiple: true,
    data: Object.assign({}, ...argv._.map(c=>commands[c]||{})),
  });

  device.disconnect();

});
