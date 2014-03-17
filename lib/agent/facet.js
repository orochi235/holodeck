var Facet = function (options) {
  /*  - Core stats - have cap and current value, can be derived from other core stats
        - id
    - type: integral, continuous, boolean
        - floor/ceil (for numeric stats)
    - value (all)
        - Actions
        - Methods - basically, public interfaces to an agent
        - Attributes - not sure what this entails, exactly, but inventory would be an example
        - Abilities - actions
        - Needs - linear values expressing how badly an agent needs a particular thing at the moment
        - id
        - floor/ceil
    - incrementation mechanism
    - behaviors triggered by threshold
        - Effects (passive) - a layer of modifiers applied to base stats, etc. (e.g. a 10% hp buff)
    - DEPENDENCIES - how to handle? */

    options = options || [];

    this.actions = options.actions || [];
    this.attributes = options.attributes || [];
    this.coreStats = options.coreStats || [];
    this.methods = options.methods || [];

};

module.exports = Facet;