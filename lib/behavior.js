function Behavior (options) {

    if (options === undefined) options = {};

    this.action = options.action || function () {};
}

export default Behavior;
