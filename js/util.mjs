class Util {
  static trekkEtTilfeldigTallMellom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static shuffle(list) {
    let output = [...list];
    for (let i = 0; i < 100; i++) {
      let rndIndexA = Util.trekkEtTilfeldigTallMellom(0, output.length - 1);
      let rndIndexB = Util.trekkEtTilfeldigTallMellom(0, output.length - 1);
      let a = output[rndIndexA];
      let b = output[rndIndexB];
      output[rndIndexA] = b;
      output[rndIndexB] = a;
    }
    return output;
  }
}

export default Util;
