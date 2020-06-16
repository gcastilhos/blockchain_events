#!/usr/bin/env python
# coding: utf-8
import logging
import os
import pandas as pd


logger = logging.getLogger(__name__)

DATA_FILE = os.environ.get('BLOCKCHAIN_DATA')


def main():
    try:
        data = pd.read_csv(DATA_FILE)
        for counter in range(0, data.shape[0], 100):
            data.iloc[slice(counter, counter + 100)].to_json(f'records_{int(counter / 100) + 1}.json',
                                                             index=False,
                                                             orient="split")
    except ValueError as error:
        logger.error("Data file should be in env var BLOCKCHAIN_DATA")
        logger.error(error)


if __name__ == '__main__':
    main()
