/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const fs = require('fs');
const path = require('path');
module.exports.bootstrap = async function () {
  if (
    sails.config.models.migrate === 'drop' ||
    process.env.FORCE_SEED === 'TRUE'
  ) {
    try {
      let seedsDir = process.env.SEED_PATH
        ? process.env.SEED_PATH
        : __dirname + '/../seeds/';
      // load JSON data
      let seeds = fs.readdirSync(seedsDir).filter((file) => {
        return path.extname(file).toLowerCase() === '.json';
      });

      for await (let seed of seeds) {
        let seedFile = seedsDir + seed;
        let model = seed.split('.')[0].toLowerCase();
        let json_seed_data = require(seedFile);
        console.log(model);
        if (sails.models[model]) {
          await sails.models[model].destroy({}).fetch();
          if (Array.isArray(json_seed_data)) {
            for await (seed_item of json_seed_data) {
              await sails.models[model].create(seed_item).fetch();
            }
          } else {
            await sails.models[model].create(json_seed_data).fetch();
          }
          sails.log.info('Bootstrap seed model: > ' + model + ' was seeded');
        } else {
          sails.log.warn(
            'Bootstrap seed model: > ' +
            model +
            ' SKIPED (model not present in sails)'
          );
        }
      }

    } catch (error) {
      console.error('bootstrap modules error: > ', error);
    }
  }

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
};
