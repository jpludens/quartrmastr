#############################################################
# This lets 'from db import tables' work from command line
import os
import sys
this_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.join(this_path, '../../quartrmastr'))
#############################################################

from db import tables


def get_build_tiers():
    all_requirements = {m: set(m.requirements) for m in tables.__all__}

    # Iterate through until all modules' requirements are satisfied
    build_tiers = [[]]
    remaining_requirements = all_requirements.items()
    while remaining_requirements:
        # Remove the previous tier's modules from each module's requirements.
        # Modules with no remaining requirements are added to the current tier.
        next_tier = []
        for build_module, requirements in remaining_requirements:
            updated_requirements = requirements.difference(build_tiers[-1])
            if not updated_requirements:
                next_tier.append(build_module)
            else:
                all_requirements[build_module] = updated_requirements
        # Something is wrong with the reference order if there are no new modules.
        if not next_tier:
            raise RuntimeError
        # Remove the newly satisfied modules from the dict of unsatisfied modules.
        else:
            for build_module in next_tier:
                del all_requirements[build_module]
        # Add the completed tier, and refresh the unsatisfied modules.
        build_tiers.append(next_tier)
        remaining_requirements = all_requirements.items()
    return build_tiers[1:]


if __name__ == "__main__":
    import pprint
    pp = pprint.PrettyPrinter().pprint
    tiers = get_build_tiers()
    for index, tier in enumerate(tiers):
        print "Starting Tier {}, containing the following modules".format(str(index+1))
        pp([module.__name__ for module in tier])
        for module in tier:
            module.build()
