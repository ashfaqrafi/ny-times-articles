const scanner = require('sonarqube-scanner').default;

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'sqp_4c5a88ca7b60240dd3891e87a2878c531aa87cb4',
    options: {
      'sonar.projectName': 'ny-times-articles',
      'sonar.projectKey': 'ny-times-articles',
      'sonar.projectVersion': '0.0.1',
      'sonar.exclusions': '',
      'sonar.sourceEncoding': 'UTF-8',
			'sonar.login': 'sqp_4c5a88ca7b60240dd3891e87a2878c531aa87cb4',
    },
  },
  (error) => {
    if (error) {
      console.error(error);
    }
    process.exit();
  },
);
