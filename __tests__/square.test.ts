import square from '../square';
describe("Function that returns array where each element raised to the power of 2", () => {
  it('Should return [1]', () => {
    expect(square([1])).toEqual([1]);
  });
  it('Should return empty array', () => {
    expect(square([])).toEqual([]);
  });
  it('Should return [1,4,9]', () => {
    expect(square([1, 2, 3])).toEqual([1, 4, 9]);
  });
  it('Should be falsy when arr contains only strings', () => {
    square(['hi', 'world']).forEach((item) => {
      expect(Number.isNaN(item)).toBeTruthy();
    });
  });
  it('Should throw when arr contains only undefined', () => {
    const err = () => {
      square([undefined, undefined]);
    }
    expect(err).toThrow();
  });
  it('Should be falsy when arr contains only undefined', () => {
    const err = () => {
      square([1, undefined, 1, 1]);
    }
    expect(err).toThrow();
  });
  it('Throws exception', () => {
    expect(square).toThrow();
  });
  it('Throws error when string comes', () => {
    const err = () => {
      square('hi');
    }
    expect(err).toThrow();
  });
  it('Throws error when number comes', () => {
    const err = () => {
      square(5);
    }
    expect(err).toThrow();
  });
  it('Throws error when boolean comes', () => {
    const err = () => {
      square(true);
    }
    expect(err).toThrow();
  });
  it('Throws error when undefined comes', () => {
    const err = () => {
      square(undefined);
    }
    expect(err).toThrow();
  });
  it('Throws error when nothing comes', () => {
    const err = () => {
      square();
    }
    expect(err).toThrow();
  });
  it('Should work correctly when args > 1', () => {
    expect(square([1, 2, 3], [1, 2, 3])).toEqual([1, 4, 9]);
  });
});