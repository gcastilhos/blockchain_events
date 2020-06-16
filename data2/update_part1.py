# coding: utf-8
import pickle
from functools import partial
import pandas as pd


def get_category_name(data, val):
    return data.loc[data.UseCategory == val, 'CategoryName'].unique()[0].strip()


part1 = pd.read_csv('part1_16Dec2011+to_12Dec2013_SENT_TO_GUS.V11_only 1500events.csv')
fields_to_update = {"POWER Composition [kWH]": "PowerComposition",
                    "USE CATEG": "UseCategory",
                    "CATEGORY NAME (Literal)": "CategoryName"
                    }
part1.rename(fields_to_update, inplace=True, axis=1)
part1.loc[part1.UseCategory.isnull(), ['UseCategory', 'CategoryName']] = ('UNDETM', 'UNDETM')
grouped_power_composition = part1.loc[:, ['PowerComposition', 'UseCategory']].groupby(by="UseCategory").sum()
pickle.dump(grouped_power_composition, open('grouped_power_composition.pickle', 'wb'))
power_composition = grouped_power_composition.reset_index()
category_name = partial(get_category_name, part1)
power_composition['CategoryName'] = power_composition.UseCategory.map(category_name)
power_composition.to_json("power_composition.json", index=False, orient="split")
