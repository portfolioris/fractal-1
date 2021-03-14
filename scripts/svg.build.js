const svgstore = require('svgstore');
const SVGO = require('svgo');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
// const { optimize } = require('svgo');
const config = require('../patternlab.config.json');

const buildSprite = () => {
  // find .svg files by glob
  const svgfiles = glob.sync(`${config.paths.assets.svg}*.svg`);
  if (!svgfiles.length) {
    console.error('No input files provided');
    return false;
  }

  const svgo = new SVGO({
    plugins: [{
      cleanupIDs: false,
    }],
  });

  // Build up the spritesheet
  const sprite = svgfiles.reduce((sprites, file) => {
    return sprites.add(
      // set the filename as the ID of the fragment
      path.basename(file, '.svg'),
      // set svg filecontent as fragment
      fs.readFileSync(file, 'utf8'),
    );
  }, svgstore());

  // const sprite2 = svgstore();
  //
  // sprite2.add('my-id', fs.readFileSync(svgfiles[2], 'utf8'));
  //
  // // console.log(sprite.toString())
  //
  // console.log(sprite2.toString());
  // const result = optimize(sprite2.toString(), { cleanupIDs: false, removeUselessDefs: false });
  //
  // console.log(result)


  svgo.optimize(sprite.toString())
    .then((res) => {
      // create sprite file
      fs.writeFileSync(`${config.paths.public.svg}/sprite.svg`, res.data);
      console.log('Svg sprite created successfully');
    });

  return true;
};

buildSprite();
