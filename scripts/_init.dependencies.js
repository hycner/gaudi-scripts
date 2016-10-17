module.exports = function makeInstallCommand () {
  let dependencies = {
    'react': '15.3.0',
    'react-dom': '15.3.0',
    'react-router': '2.8.1'
  };

  let installCommand = ['install'];

  for (let x of Object.keys(dependencies)) {
    installCommand.push(`${x}@${dependencies[x]}`);
  }

  installCommand.push('-SE');

  return installCommand;
};
