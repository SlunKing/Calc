(function ( $ ) {
	$.fn.pressure = function(options) {
		
		let self = this;
		
		let classifications = {
			vessel: {
				one: {
					"gas/steam": { },
					fluid: { }
				},
				two: {
					"gas/steam": { },
					fluid: { }
				}
			},
			pipeline: {
				one: {
					"gas/steam": { },
					fluid: { }
				},
				two: {
					"gas/steam": { },
					fluid: { }
				}
			},
			boiler: { }
		};
		
		classifications["vessel"]["one"]["gas/steam"] = {
			1: {
				// объем
				capacity: [ 0.001, null],
				// давление
				pressure: [ 0.05, null ],
				// произведение объема и максимального давления
				product: [ 0.0025, 0.005 ],
			},
			2: {
				capacity: [ 0.001, null ],
				pressure: [ 0.05, null ],
				product: [ 0.005, 0.02 ],
			},
			3: {
				capacity: [ 
					[ 0.0001, 0.001 ],
					[ 0.001, null ]
				],
				pressure: [
					[ 20, 100 ],
					[ 0.05, null ]
				],
				product: [
					[ null, null ],
					[ 0.02, 0.1 ]
				]
			},
			4: {
				capacity: [ 
					[ 0.0001, 0.001 ],
					[ 0.001, null ]
				],
				pressure: [
					[ 100, null ],
					[ 0.05, null ]
				],
				product: [
					[ null, null ],
					[ 0.1, null ]
				],
			}
		};
		
		classifications["vessel"]["one"]["fluid"] = {
			1: {
				capacity: [ 0.01, null ],
				pressure: [ 0.05, 1 ],
				product: [ 0.02, null ],
			},
			2: {
				capacity: [
					[ 0.001, null ],
					[ 0.0001, 0.001 ],
				],
				pressure: [
					[ 1, 50 ],
					[ 50, null ],
				],
				product: [
					[ 0.02, null ],
					[ null, null ],
				]
			},
			3: {
				capacity: [ 0.001, null ],
				pressure: [ 50, null ],
				product: [ null, null ],
			}
		};
		
		classifications["vessel"]["two"]["gas/steam"] = {
			1: {
				capacity: [ 0.001, null ],
				pressure: [ 0.05, null ],
				product: [ 0.005, 0.02 ],
			},
			2: {
				capacity: [ 0.001, null ],
				pressure: [ 0.05, null ],
				product: [ 0.02, 0.1 ],
			},
			3: {
				capacity: [ 
					[0.0001, 0.001],
					[0.001, 1],
					[1, null]
				],
				pressure: [
					[ 100, 300 ],
					[ 0.05, null ],
					[ 0.05, 0.4 ]
				],
				product: [
					[ null, null ],
					[ 0.1, 0.3 ],
					[ null, null ]
				],
			},
			4: {
				capacity: [
					[ 0.0001, 0.001 ],
					[ 0.001, 1 ],
					[ 1, null ],
				],
				pressure: [
					[ 300, null ],
					[ 0.4, null ],
					[ 0.4, null ],
				],
				product: [
					[ null, null ],
					[ 0.3, null ],
					[ null, null ],
				],
			},
		};
		
		classifications["vessel"]["two"]["fluid"] = {
			1: {
				capacity: [ 0.01, null ],
				pressure: [ 1, 50 ],
				product: [ 1, null ],
			},
			2: {
				capacity: [
					[ 0.0001, 0.01 ],
					[ 0.01, null ],
				],
				pressure: [
					[ 100, null ],
					[ 50, null ],
				],
				product: [
					[ null, null ],
					[ 1, null ],
				],
			}
		};
		
		classifications["pipeline"]["one"]["gas/steam"] = {
			1:{
				capacity: [
					[ 25, 100 ],
					[ 25, 100 ],
				],
				pressure: [
					[ 0.05, 1 ],
					[ 1, 3.5 ],
				],
				product: [
					[ null, null ],
					[ null, 100 ],
				]
			},
			2:{
				capacity: [
					[ 100, 350 ],
					[ 25, 350 ],
					[ 25, 100 ],
				],
				pressure: [
					[ 0.05, 1 ],
					[ 1, 3.5 ],
					[ 3.5, null ],
				],
				product: [
					[ null, null ],
					[ 100, 350 ],
					[ null, null ]
				]
			},
			3:{
				capacity: [
					[ 350, null ],
					[ 100, 350 ],
					[ 100, null ],
				],
				pressure: [
					[ 0.05, 1 ],
					[ 1, 3.5 ],
					[ 3.5, null ],
				],
				product: [
					[ null, null ],
					[ 350, null ],
					[ null, null ],
				]
			},
		};
		
		classifications["pipeline"]["one"]["fluid"] = {
			1: {
				capacity: [ 25, null ],
				pressure: [ 0.05, 1 ],
				product: [ 200, null ],
			},
			2: {
				capacity: [
					[ 25, null ],
					[ 25, null ],
				],
				pressure: [
					[ 1, 8 ],
					[ 8, 50 ],
				],
				product: [
					[ 200, null ],
					[ 350, null ],
				]
			},
			3: {
				capacity: [ 25, null ],
				pressure: [ 50, null ],
				product: [ null, null ],
			}
		};
		
		classifications["pipeline"]["two"]["gas/steam"] = {
			1:{
				capacity: [
					[ 32, null ],
					[ 32, 100 ],
				],
				pressure: [
					[ 0.05, 3.2 ],
					[ 3.2, null ],
				],
				product: [
					[ 100, 350 ],
					[ null, null ],
				]
			},
			2:{
				capacity: [
					[ 100, null ],
					[ 100, 250 ],
				],
				pressure: [
					[ 0.05, 3.2 ],
					[ 3.2, null ],
				],
				product: [
					[ 350, 500 ],
					[ null, null ],
				]
			},
			3:{
				capacity: [
					[ 250, null ],
					[ 250, null ],
				],
				pressure: [
					[ 3.2, null ],
					[ 0.05, 3.2 ],
				],
				product: [
					[ null, null ],
					[ 500, null ],
				]
			},
		};
		
		classifications["pipeline"]["two"]["fluid"] = {
			1: {
				capacity: [ 200, null ],
				pressure: [ 1, 50 ],
				product: [ 500, null ],
			},
			2: {
				capacity: [ 200, null ],
				pressure: [ 50, null ],
				product: [ null, null ],
			}
		};
		
		classifications["boiler"] = {
			1: {
				capacity: [ 0.002, 0.1 ],
				pressure: [ 0.05, null ],
				product: [ null, 0.005 ],
			},
			2: {
				capacity: [ 0.002, 0.4 ],
				pressure: [ 0.05, 3.2 ],
				product: [ 0.005, 0.02 ],
			},
			3: {
				capacity: [ 0.002, 1 ],
				pressure: [ 0.05, 3.2 ],
				product: [ 0.02, 0.3 ],
			},
			4: {
				capacity: [
					[ 0.002, 0.01 ],
					[ 0.01, 1 ],
					[ 1, null ],
				],
				pressure: [
					[ 3.2, null ],
					[ 0.3, null ],
					[ 0.05, null ],
				],
				product: [
					[ null, null ],
					[ 0.3, null ],
					[ null, null ],
				]
			}
		};

		// ограничение ввода
		$("input", self).keydown(function(event) {		
			
			if (event.ctrlKey)
			{
				return true;
			}
			
			// включённые клавиши
			if (event.key.search(/[\d.,]|Backspace|Delete|End|Home|Space|Enter|Tab|Arrow.*/) === -1)
			{
				return false;
			}
		});
		
		$('select[name="appliance"]', self).change(function(){
			let appliance = $(this).val();
			
			$(".field.size .title span", self).hide();
			$(".field.size .title ." + appliance, self).show();
			
			if (appliance == "boiler")

			{
				$('select[name="group"]').prop("disabled", true);
				$('select[name="environment"]').prop("disabled", true);
			}
			else
			{
				$('select[name="group"]').prop("disabled", false);
				$('select[name="environment"]').prop("disabled", false);
			}
		});
		
		this.submit(function() {
			
			// замена запятой на точку
			$("input", self).each(function() {
				if ($(this).val().indexOf(",") !== -1)
				{
					$(this).val($(this).val().replace(",", "."));
				}
			});
			
			let group = $('select[name="group"]', self).val();
			let appliance = $('select[name="appliance"]', self).val();
			let environment = $('select[name="environment"]', self).val();
			let size = parseFloat($('input[name="size"]', self).val());
			let pressure = parseFloat($('input[name="pressure"]', self).val());
			let result = 0;
			
			let compare = function(userData, condition) {

				if (condition[0] != null)
				{
					if (!(userData > condition[0]))
					{
						return true;
					}
				}
				
				if (condition[1] != null)
				{
					if (!(userData <= condition[1]))
					{
						return true;
					}
				}
			};
			
			let compareProduct = function (product, condition) {
				
				if (condition[0] != null)
				{
					if (!(product > condition[0]))
					{
						return true;
					}
				}

				if (condition[1] != null)
				{
					
					if (!(product <= condition[1]))
					{
						return true;
					}
				}
			}
		
			try {
				
				let classification = (appliance == "boiler") ? classifications["boiler"] : classifications[appliance][group][environment];
				
				for (let r in classification)
				{
					let g = classification;
					let acceptableLimits = false;
					
					if (g[r].capacity[0] instanceof Array)
					{
						
						for (let i = 0; i < g[r].capacity.length; i++ )
						{
							
							if (compare(size, g[r].capacity[i]))
							{
								continue;
							}
							if (compare(pressure, g[r].pressure[i]))
							{
								continue;
							}
							acceptableLimits = true;
							
							if (g[r].product[i][1] != null || g[r].product[i][0] != null)
							{
								let product = (size * pressure).toFixed(10);
								
								
								if (compareProduct(product, g[r].product[i]))
								{
									continue;
								}
							}
							
							result = r;
							break;
						}

						continue;
					}
					else
					{
						if (compare(size, g[r].capacity))
						{
							continue;
						}
						if (compare(pressure, g[r].pressure))
						{
							continue;
						}
						acceptableLimits = true;
						
						if (g[r].product[1] != null || g[r].product[0] != null)
						{
							
							let product = (size * pressure).toFixed(10);
							
							if (compareProduct(product, g[r].product))
							{
								continue;
							}
						}
						
						result = r;
						
						break;
					}
					
					
				}
				
			}
			catch (e)
			{
				console.log(e);
			}
			
			$(".result span", self).html(result);
			
			$(".note").hide();
			if (result > 0)
			{
				$(".note.success").show();
			}
			else if (pressure <= 0.05)
			{
				$(".note.out-range").show();
			}
			else if (pressure >= 0.07)
			{
				$(".note.disclaimer").show();
			}
			
			return false;
		});
		
		let initFn = function() {
			$('select[name="appliance"]', self).change();
		};
		
		initFn();
		
	};
})(jQuery);
