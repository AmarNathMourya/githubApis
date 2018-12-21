module.exports = function(router, request, async, config) {
    
    router.get('/issues', function(req, res) {
        var issueData = [];
        var getData = function(pageCounter) {
            request({
                url: 'https://api.github.com/repos/' + req.query.owner + '/' + req.query.repo + '/issues?state=all' + '&page=' + pageCounter + '&client_id=' + config.CLIENT_ID + '&' + 'client_secret=' + config.CLIENT_SECRET,
                headers: { 'user-agent': 'git-technetium' },
                json: true
            }, function(error, response, body) {
                if(!error && response.statusCode === 200) {
                    for(var issueIndex = 0; issueIndex < body.length; issueIndex++ ) {
                        if( !body[issueIndex].pull_request) {
                            issueData.push({
                            
                                title: body[issueIndex].title,
                                state: body[issueIndex].state,
                                creator: body[issueIndex].user.login,
                                assignee: body[issueIndex].assignee ? body[issueIndex].assignee.login : ''
                            });
                        }
                    }

                    
                }
            });
        };
        getData(1);
    });
};
