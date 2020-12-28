'use strict';

import Axios from 'axios';

const instance = Axios.create({
    baseURL: process.env.VUE_APP_URL,
    timeout: 10000
});

export default instance;