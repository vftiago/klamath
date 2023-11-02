import { graphql } from "@octokit/graphql";

export const DEFAULT_OWNER = "vftiago";

const graphqlOptions = {
	owner: DEFAULT_OWNER,
};

const graphqlWithAuth = graphql.defaults({
	headers: {
		authorization: `token ${import.meta.env.VITE_GITHUB_AUTH_TOKEN}`,
	},
});

type ProjectItem = {
	content: {
		title: string;
		body: string;
		state: "OPEN" | "CLOSED";
	};
};

type ProjectNode = {
	title: string;
	items: {
		nodes: ProjectItem[];
	};
};

export type UserProjectsV2 = {
	user: {
		projectsV2: {
			nodes: ProjectNode[];
		};
	};
};

export const getProjectData = async (): Promise<UserProjectsV2> => {
	const projectData = await graphqlWithAuth<UserProjectsV2>({
		query: /* GraphQL */ `
			query projectData($owner: String!, $projectCount: Int = 20, $itemCount: Int = 5) {
				user(login: $owner) {
					projectsV2(first: $projectCount) {
						nodes {
							title
							... on ProjectV2 {
								items(first: $itemCount) {
									nodes {
										content {
											... on DraftIssue {
												title
												body
											}
											... on Issue {
												title
												body
												state
											}
											... on PullRequest {
												title
												body
												state
											}
										}
									}
								}
							}
						}
					}
				}
			}
		`,
		...graphqlOptions,
	});

	return projectData;
};

export type RepositoryNode = {
	name: string;
	description: string | null;
	homepageUrl: string | null;
	url: string;
	owner: {
		login: string;
	};
	defaultBranchRef: {
		target: {
			history: {
				edges: {
					node: {
						message: string;
					};
				}[];
			};
		};
	};
};

export type UserRepositories = {
	user: {
		repositories: {
			nodes: RepositoryNode[];
		};
	};
};

export const getRepositoryData = async (): Promise<UserRepositories> => {
	const repositoryData = await graphqlWithAuth<UserRepositories>({
		query: /* GraphQL */ `
			query repositoryData($owner: String!, $repoCount: Int = 20, $commitCount: Int = 5) {
				user(login: $owner) {
					repositories(
						first: $repoCount
						isArchived: false
						isFork: false
						orderBy: { field: UPDATED_AT, direction: DESC }
					) {
						nodes {
							name
							owner {
								login
							}
							description
							homepageUrl
							url
							... on Repository {
								defaultBranchRef {
									target {
										... on Commit {
											history(first: $commitCount) {
												edges {
													node {
														... on Commit {
															message
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		`,
		...graphqlOptions,
	});

	return repositoryData;
};
