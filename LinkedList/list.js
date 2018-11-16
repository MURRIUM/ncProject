'use strict';
class LinkedList
{
	constructor(...nodes)
	{
		let arr = nodes;
		this.top = {
			next: null
		};
		let current = this.top;
		for(let i = 0; i < arr.length; i++)
		{
			current.value = arr[i];

			if(i+1 == arr.length)
				break;

			current.next = {
				next: null
			};
			current = current.next;
		}
	}

	Push(arg)
	{
		let current = this.top;
		while (current.next !== null)
		{
			current = current.next;
		}

		current.next = {
			value: arg,
			next: null
		};
	}

	ShowList()
	{
		console.log(this.top);
		let current = this.top;
		while (current !== null)
		{
			console.log(current.value);
			current = current.next;
		}
	}

	Pop()
	{
		let current = this.top;
		while (current.next.next !== null)
		{
			current = current.next;
		}
		delete current.next;
		current.next = null;
	}

	Reverse()
	{
		let current = this.top;
		let revList = {next: null};
		while(current !== null)
		{
			revList.value = current.value;
			revList = {next: revList};

			current = current.next;
		}

		this.top = revList.next;
	}

	Set(value, index)
	{
		let current = this.top;
		for(let i = 0; i < index-1; i++)
		{
			current = current.next;
		}
		let nextCur = current.next;
		current.next = 
		{
			value: value,
			next: nextCur
		}
	}

	Contains(value)
	{
		let current = this.top;
		while(current !== null)
		{
			if(current.value === value)
			{
				console.log("true");
				return true;
			}
			current = current.next;
		}
		console.log("false");
		return false;
	}

	ContainsIndex(index)
	{
		let current = this.top;
		for(let i = 0; i <= index; i++)
		{
			current = current.next;
			if(current === null)
			{
				console.log("false");
				return false;
			}
		}
		console.log("true");
		return true;
	}

	forEach(callback, thisArg)
	{
		let T;

    	if (typeof callback !== 'function') 
    	{
    	   throw new TypeError(callback + ' is not a function');
    	}

    	if (arguments.length > 1) 
    	{
     		T = thisArg;
    	}

    	let current = this.top;

    	while (current !== null) 
    	{

        	callback.call(T, current);

      		current = current.next;
    	}
	}

	Each(index, callback, thisArg)
	{
		if(!this.ContainsIndex(index))
		{
			throw new Error(index+' is invalid index');
		}

    	if (typeof callback !== 'function') 
    	{
    	   throw new TypeError(callback + ' is not a function');
    	}

    	let T;

    	if (arguments.length > 1) 
    	{
     		T = thisArg;
    	}

    	let current = this.top;


    	for(let i = 0; i < index; i++) 
    	{
      		current = current.next;
    	}

    	callback.call(T, current);
	}

	Shift()
	{
		let current = this.top;
		this.top = this.top.next;
	}

	Unshift(arg)
	{
		let current = {
			value: arg,
			next: this.top
		};
		this.top = current;
	}

};

window.onload = function()
{
	let list = new LinkedList(1,"qe", {name: "Vasya"}, 2, "privet");
	list.ShowList();

	list.Push(11);
	console.log(">>>Push(11) test");
	list.ShowList();

	list.Pop();
	console.log(">>>Pop test");
	list.ShowList();

	list.Reverse();
	console.log(">>>Reverse test");
	list.ShowList();
	list.Reverse();

	list.Unshift(14);
	console.log(">>>Unshift(14) test");
	list.ShowList();

	list.Shift();
	console.log(">>>Shift(11) test");
	list.ShowList();

	console.log(">>>Contains(1) test");
	list.Contains(1);

	console.log(">>>Contains(154) test");
	list.Contains(154);

	console.log(">>>ContainsIndex(2) test");
	list.ContainsIndex(2);

	console.log(">>>ContainsIndex(151) test");
	list.ContainsIndex(151);

	console.log(">>>Each test");
	list.Each(2, function(names){
		names.value = 111111;
	});
	list.ShowList();

	
	console.log(">>>forEach test");
	list.Reverse();
	let list2 = new LinkedList("list2");
	
	list.forEach(function(names){
		list2.Push(names.value);
	});
	list2.ShowList();
}