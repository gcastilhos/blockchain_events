#!/usr/bin/env python
# coding: utf-8
import logging
from functools import partial
import os
import pandas as pd


logger = logging.getLogger(__name__)

DATA_FILE = os.environ.get('BLOCKCHAIN_DATA')
FIELDS_TO_UPDATE = {"POWER Composition [kWH]": "PowerComposition",
                    "USE CATEG": "UseCategory",
                    "CATEGORY NAME (Literal)": "CategoryName"
                    }
 

def get_category_name(data, val):
    return data.loc[data.UseCategory == val, 'CategoryName'].unique()[0].strip()


def rename_columns(data):
    data.rename(FIELDS_TO_UPDATE, inplace=True, axis=1)


def replace_null_categories(data):
    data.loc[data.UseCategory.isnull(), ['UseCategory', 'CategoryName']] = ('UNDETM', 'UNDETM')


def power_composition_groups(data):
    grouped = data.loc[:, ['PowerComposition', 'UseCategory']].groupby(by="UseCategory").sum()
    grouped.reset_index(inplace=True)
    category_name = partial(get_category_name, data)
    grouped['CategoryName'] = grouped.UseCategory.map(category_name)
    return grouped


def save_to_json(data, index):
    data.to_json(f"power_composition_{index}.json", index=False, orient="split")


def calculate_total(data, index):
    rename_columns(data)
    replace_null_categories(data)
    save_to_json(power_composition_groups(data), index)


def create_record_groups(data):
    data.loc[data['USE CATEG'].isnull(), ['USE CATEG', 'CATEGORY NAME (Literal)']] = ('UNDETM', 'UNDETM')
    for counter in range(0, data.shape[0], 100):
        data_slice = data.iloc[slice(counter, counter + 100)]
        index = int(counter / 100) + 1
        data_slice.sort_values(by='USE CATEG').to_json(f'events_{index}.json',
                                                       index=False,
                                                       orient="split")
        calculate_total(data_slice.copy(), index)


def main():
    try:
        data = pd.read_csv(DATA_FILE)
        create_record_groups(data)     
    except ValueError as error:
        logger.error("Data file should be in env var BLOCKCHAIN_DATA")
        logger.error(error)


if __name__ == '__main__':
    main()
