let fs = require('fs-extra');
let path = require('path');
let spawn = require('cross-spawn');
let pathExists = require('path-exists');
let chalk = require('chalk');

let installCommand = require('./_init.dependencies');

module.exports = function(appPath, appName, verbose, originalDirectory) {
  let ownPackageName = require(path.join(__dirname, '..', 'package.json')).name;
  let ownPath = path.join(appPath, 'node_modules', ownPackageName);
  let appPackage = require(path.join(appPath, 'package.json'));

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};
  appPackage.devDependencies = appPackage.devDependencies || {};

  // Setup the script rules
  appPackage.scripts = {
    'start': 'gaudi-scripts start',
    'build': 'gaudi-scripts build',
    'test': 'gaudi-scripts test --env=jsdom',
    'eject': 'gaudi-scripts eject'
  };

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  let readmeExists = pathExists.sync(path.join(appPath, 'README.md'));
  if (readmeExists) {
    fs.renameSync(path.join(appPath, 'README.md'), path.join(appPath, 'README.old.md'));
  }

  // Copy the files for the user
  fs.copySync(path.join(ownPath, 'template'), appPath);

  // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
  // See: https://github.com/npm/npm/issues/1862
  fs.move(path.join(appPath, 'gitignore'), path.join(appPath, '.gitignore'), [], function (err) {
    if (err) {
      // Append if there's already a `.gitignore` file there
      if (err.code === 'EEXIST') {
        let data = fs.readFileSync(path.join(appPath, 'gitignore'));
        fs.appendFileSync(path.join(appPath, '.gitignore'), data);
        fs.unlinkSync(path.join(appPath, 'gitignore'));
      } else {
        throw err;
      }
    }
  });

  // Run another npm install for the demo dependencies
  console.log('Installing non-build dependencies from npm...');
  console.log();
  // TODO: having to do two npm installs is bad, can we avoid it?
  let args = installCommand();
  if (verbose) args.push('--verbose');

  let proc = spawn('npm', args, {stdio: 'inherit'});
  proc.on('close', code => {
    if (code !== 0) {
      console.error('`npm ' + args.join(' ') + '` failed');
      return;
    }

    // Display the most elegant way to cd.
    // This needs to handle an undefined originalDirectory for
    // backward compatibility with old global-cli's.
    let cdpath;
    if (originalDirectory &&
        path.join(originalDirectory, appName) === appPath) {
      cdpath = appName;
    } else {
      cdpath = appPath;
    }

    console.log();
    console.log('Success! Created ' + appName + ' at ' + appPath);
    console.log('Inside that directory, you can run several commands:');
    console.log();
    console.log(chalk.cyan('  npm start'));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.cyan('  npm run build'));
    console.log('    Bundles the app into static files for production.');
    console.log();
    console.log(chalk.cyan('  npm test'));
    console.log('    Starts the test runner.');
    console.log();
    console.log(chalk.cyan('  npm run eject'));
    console.log('    Removes this tool and copies build dependencies, configuration files');
    console.log('    and scripts into the app directory. If you do this, you can’t go back!');
    console.log();
    console.log('We suggest that you begin by typing:');
    console.log();
    console.log(chalk.cyan('  cd'), cdpath);
    console.log('  ' + chalk.cyan('npm start'));
    if (readmeExists) {
      console.log();
      console.log(chalk.yellow('You had a `README.md` file, we renamed it to `README.old.md`'));
    }
    console.log();
    console.log('Happy hacking!');
  });
};
