// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Reducer} from 'types/actions';
import {Dictionary} from 'types/utilities';

// Based on http://nicolasgallagher.com/redux-modules-and-code-splitting/
export class ReducerRegistry {
    emitChange?: (reducers: Dictionary<Reducer>) => void;
    reducers: Dictionary<Reducer> = {};

    setReducers = (reducers: Dictionary<Reducer>) => {
        this.reducers = reducers;
    }

    getReducers = () => {
        return {...this.reducers};
    }

    register = (name: string, reducer: Reducer) => {
        this.reducers = {...this.reducers, [name]: reducer};
        if (this.emitChange) {
            this.emitChange(this.getReducers());
        }
    }

    setChangeListener = (listener: (reducers: Dictionary<Reducer>) => void) => {
        this.emitChange = listener;
    }
}

const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
