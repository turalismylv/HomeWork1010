/*!
 * jQuery ShoppingCart Plugin v1.4.3
 * http://knopix.net/
 *
 * Copyright 2014 Volodymyr Stelmakh (vov1)
 * Released under the MIT license
 */
(function( $ ){
	
	// Local storage check
	function supportsStorage() {
  		try {
    		return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
    		return false;
  		}
	}
	
	if ( supportsStorage() === true ) {
		
		// Reset all cart
		function Reset() {
			localStorage.setItem('shoppingcartProducts', JSON.stringify( [] ));
			localStorage.setItem('shoppingcartCount', 0);
			localStorage.setItem('shoppingcartPrice', 0);
		}
		
		// Find item index
		function FindItem( id ) {
			var shoppingcartArray = JSON.parse( localStorage.getItem('shoppingcartProducts') );
			
			for(var i in shoppingcartArray) {
    			if ( !shoppingcartArray.hasOwnProperty(i) ) continue;
    			if ( shoppingcartArray[i].id == id ) return i;
    		}
    		
			return null;
		}
		
		// Create empty cart if NOT exist
		if ( localStorage.getItem('shoppingcartProducts') === null ) {
			Reset();
		}
		
		var methods = {
   			// Add item
    		add : function( content ) {
    			
    			// Check for required id & price
    			if ( ! content.id || ! content.price ) {
    				$.error( "'id' OR 'price' is NOT defined!" );
    				return false;
    			}
    			
    			// Get items
				var shoppingcartArray = JSON.parse( localStorage.getItem('shoppingcartProducts') );
    			
    			// Check if item already in cart
    			index = FindItem( content.id );
    			
    			if ( index === null ) {
    				// item not exist
					shoppingcartArray.push( { 
					'id': parseInt(content.id),
					'image': content.image || '',
					'name': content.name || '',
					'code': content.code || '',
					'url': content.url || '',
					'attributes': content.attributes || [],
					'price': parseFloat(content.price),
					'count': parseInt( (content.count || 1) )
					} );
				} else {
					// item exist
					shoppingcartArray[index].count += parseInt( (content.count || 1) );
				}
    			
				// Update storage
				localStorage.setItem('shoppingcartProducts', JSON.stringify(shoppingcartArray));
				
				// Update count
				var Count = parseInt( localStorage.getItem('shoppingcartCount') ) + (content.count || 1);
				localStorage.setItem( 'shoppingcartCount', Count );
				
				// Update price
				var Price = parseFloat( localStorage.getItem('shoppingcartPrice') ) + (content.price * (content.count || 1));
				localStorage.setItem( 'shoppingcartPrice', Price);
				
				return true;
    		},
    		
    		// Edit item
    		edit : function( content ) {
    			// Check for required id
    			if ( ! content.id ) {
    				$.error( "'id' is NOT defined!" );
    				return false;
    			}
    			
    			// Get items
    			var shoppingcartArray = JSON.parse( localStorage.getItem('shoppingcartProducts') );
    			
    			// Check if item already in cart
    			index = FindItem( content.id );
    			
    			if ( index === null ) {
    				$.error( "No item with required id!" );
    				return false;
    			}
    			else {
					// item exist
					if (content.image !== undefined) {
						shoppingcartArray[index].image = content.image;
					}
					if (content.name !== undefined) {
						shoppingcartArray[index].name = content.name;
					}
					if (content.code !== undefined) {
						shoppingcartArray[index].code = content.code;
					}
					if (content.url !== undefined) {
						shoppingcartArray[index].url = content.url;
					}
					if (content.attributes !== undefined) {
						shoppingcartArray[index].attributes = content.attributes;
					}
					var oldPrice = shoppingcartArray[index].price;
					if (content.price !== undefined) {
						shoppingcartArray[index].price = parseFloat(content.price);
					}
					var oldCount = shoppingcartArray[index].count;
					if (content.count !== undefined) {
						shoppingcartArray[index].count = parseInt(content.count);
					}
				}
				
				// Update storage
				localStorage.setItem('shoppingcartProducts', JSON.stringify(shoppingcartArray));
				
				// Update count & price
				if ( content.count !== undefined || content.price !== undefined ) {
					var Count = parseInt( localStorage.getItem('shoppingcartCount') ) + (parseInt(content.count) - oldCount);
					localStorage.setItem( 'shoppingcartCount', Count );
					
					var Price = parseFloat( localStorage.getItem('shoppingcartPrice') ) + (shoppingcartArray[index].count * shoppingcartArray[index].price) - (oldCount * oldPrice);
					localStorage.setItem( 'shoppingcartPrice', Price);
				}
				
				return true;
    		},
    		
    		// Remove selected item
   			remove : function( content ) {
      			// Check for required id
    			if ( ! content.id ) {
    				$.error( "'id' is NOT defined!" );
    				return false;
    			}
    			
    			index = FindItem( parseInt(content.id) );
    			if ( index === null) return false;
    			
    			// Get items
    			var shoppingcartArray = JSON.parse( localStorage.getItem('shoppingcartProducts') );
    			// Update count
				var Count = parseInt( localStorage.getItem('shoppingcartCount') ) - shoppingcartArray[index].count;
				localStorage.setItem( 'shoppingcartCount', Count );				
				// Update price
				var Price = parseFloat( localStorage.getItem('shoppingcartPrice') ) - (shoppingcartArray[index].price * shoppingcartArray[index].count);
				localStorage.setItem( 'shoppingcartPrice', Price);		
    			// Remove selected item
    			shoppingcartArray.splice( index, 1 );			
    			// Update storage
				localStorage.setItem('shoppingcartProducts', JSON.stringify(shoppingcartArray));
				
				return true;	
    		},
    		
    		
    		// Clear all cart
    		clear : function(  ) {
      			Reset();
				return true;
    		},
    		
    		
    		// Get items count
    		getCount : function(  ) {
      			return parseInt( localStorage.getItem('shoppingcartCount') );
    		},
    		
    		
    		// Get cart price
    		getPrice : function(  ) {
      			return parseFloat( localStorage.getItem('shoppingcartPrice') );
    		},
    		
    		
    		// Get cart items
    		getAll : function(  ) {
      			// Get items
    			return JSON.parse( localStorage.getItem('shoppingcartProducts') );
    		},
    		
    		// Get item by id
    		getById : function( id ) {
				index = FindItem( parseInt(id) );
				if ( index === null) {
					$.error( "No item with required id!" );
    				return false;
				}
				else {
					// Get all items
    				var shoppingcartArray = JSON.parse( localStorage.getItem('shoppingcartProducts') );
    				return shoppingcartArray[index];
				}
			}
  		};
		
		
		
  		$.shoppingcart = function( method ) {
    		// Method call logic
    		if ( methods[method] ) {
    	  		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    		} else if ( typeof method === 'object' || ! method ) {
    	  		return methods.init.apply( this, arguments );
    		} else {
      			$.error( 'Method ' +  method + ' not exist in jQuery.shoppingcart' );
    		} 
  		};
  		
  		
	} else {
		$.error( 'jQuery.shoppingcart: window.localStorage is NOT available!' );
	}
	

})( jQuery );
