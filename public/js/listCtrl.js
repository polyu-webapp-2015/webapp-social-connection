app.controller("ListCtrl", function ($scope, $http, $global) {
	$scope.elems = [
		{
			name: "Dolor sit", 
			content: "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
		},
		{
			name: "Sed ut", 
			content: "Perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
		},
		{
			name: "Nemo enim",
			content: "Ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
		},
		{
			name: "Ut enim",
			content: "Ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"
		}
	];

	$scope.rowClass = function (elem, elems) {
		if (elems.indexOf(elem) % 2 == 0) return 'nor';
		else return 'alt'; 
	}
});

