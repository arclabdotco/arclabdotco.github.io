var schema = function(){

	return {

		alpha:['#','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
		files:FILES_ARRAY,
		generate:function(){
			var self = view;

			//alphabetize by name
			self.files.sort(function(a,b){
				if(a.name <b.name)
					return -1;
				if(a.name >b.name)
					return 1;
				return 0;
			});

			//filter out unpublished items
			self.files = self.files.filter(function(d){ return d.published !== 'false'; });

			//separate out relevant letters
			var alphaDisplay = [],
				alphaHolder  = {};
			self.files.forEach(function(d){
				var firstChar = d.name.charAt(0),
					matchElem;

				//if letter
				if(isNaN(firstChar)){
					matchElem = self.alpha.filter(function(_d){ return _d === firstChar.toUpperCase(); })[0];
				//if number
				} else{
					matchElem = self.alpha[0];
				}
				//create space for that character in the alphaHolder
				if(!alphaHolder[matchElem]){
					alphaHolder[matchElem] = [];
				}
				if(alphaDisplay.indexOf(matchElem) <0){
					alphaDisplay.push(matchElem);
				}
				alphaHolder[matchElem].push(d);
			});
			alphaDisplay.sort();

			//build straightforward alphabetized list with links
			var alphaIndex,
				alphaItems,
				alphaLinks;
			alphaIndex = d3.select('div.content.page_files')
				.selectAll('ul.alphaIndex')
				.data(alphaDisplay);
			alphaIndex.enter().append('ul')
				.classed('alphaIndex',true);
			alphaIndex
				.text(function(d){ return d; });
			alphaIndex.exit().remove();
			alphaItems = alphaIndex.selectAll('li.alphaItems')
				.data(function(d){ return alphaHolder[d].sort(); });
			alphaItems.enter().append('li')
				.classed('alphaItems',true);
			alphaItems.exit().remove();
			alphaLinks = alphaItems.selectAll('a.alphaLinks')
				.data(function(d){ return [d]; });
			alphaLinks.enter().append('a')
				.classed('alphaLinks',true);
			alphaLinks
				.attr('href',function(d){
					return d.path;
				})
				.text(function(d){ return d.name; })
				;
			alphaLinks.exit().remove();
		}
	}
}

var view = schema();
view.generate();