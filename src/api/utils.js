/*
 * Copyright © 2017 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
import { LIVE_PORT, SSL_PORT, TEST_PORT } from 'constants';

export const getDefaultPort = options => {
	if (options.testnet) return TEST_PORT;
	if (options.ssl) return SSL_PORT;
	return LIVE_PORT;
};

export const netHashOptions = ({ port }) => {
	const testnetNethash =
		'da3ed6a45429278bac2666961289ca17ad86595d33b31037615d4b8e8f158bba';
	const mainnetNethash =
		'ed14889723f24ecc54871d058d98ce91ff2f973192075c0155ba2b7b70ad2511';

	const commonNethash = {
		'Content-Type': 'application/json',
		os: 'lisk-js-api',
		version: '1.0.0',
		minVersion: '>=0.5.0',
		port,
		Accept: 'application/json',
	};

	return {
		testnet: Object.assign({}, commonNethash, {
			nethash: testnetNethash,
			broadhash: testnetNethash,
		}),
		mainnet: Object.assign({}, commonNethash, {
			nethash: mainnetNethash,
			broadhash: mainnetNethash,
		}),
	};
};

export const getURLPrefix = ({ ssl }) => (ssl ? 'https' : 'http');

export const getFullURL = ({ node, port, ssl }) => {
	const nodeUrl = port ? `${node}:${port}` : node;
	return `${getURLPrefix({ ssl })}://${nodeUrl}`;
};

export const wrapSendRequest = (method, endpoint, getDataFn) =>
	function wrappedSendRequest(value, options) {
		const providedOptions = options || {};
		const providedData = getDataFn(value, providedOptions);
		const data = Object.assign({}, providedData, providedOptions);
		return this.sendRequest(method, endpoint, data);
	};

export const checkOptions = (options = {}) => {
	Object.entries(options).forEach(([key, value]) => {
		if (value === undefined || Number.isNaN(value)) {
			throw new Error(`"${key}" option should not be ${value}`);
		}
	});

	return options;
};

export const toQueryString = obj => {
	const parts = Object.entries(obj).reduce(
		(accumulator, [key, value]) => [
			...accumulator,
			`${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
		],
		[],
	);

	return parts.join('&');
};
