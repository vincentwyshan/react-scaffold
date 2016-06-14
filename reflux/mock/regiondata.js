import Mock from "mockjs";


export const createMockData = function() {
	Mock.setup({
		timeout: '200-800'
	});
    Mock.mock(/regiondata\/province/, {
        'data|20': [{
            'name': '@province',
            'value|300-1000': 1000
        }]
    });
    Mock.mock(/regiondata\/city/, {
        'data|20': [{
            'name': '@city',
            'value|300-1000': 1000
        }]
    });
};
