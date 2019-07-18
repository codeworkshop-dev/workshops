import particle from '../particle';

export default async function getDeviceStatus(deviceId, token) {
  let status = {};
  try {
    const response = await particle.getVariable({
      deviceId: deviceId,
      name: 'status',
      auth: token,
    });

    status = JSON.parse(response.body.result);
  } catch (ex) {}

  return status;
}
