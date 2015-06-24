var CoreStat = function (options) {
    this.id = options.id;
    this.min = options.min;
    this.max = options.max;
    this.initial = options.initial || this.max;
    this.value = this.initial;
};

export default CoreStat;
