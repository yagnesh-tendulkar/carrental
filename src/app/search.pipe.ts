import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log(items, searchText);
    if (items.length == 0) return [];
    if (!searchText) return items;
    console.log(items, searchText);
    // return
    let results = [];
    items.forEach((it) => {
      if (it.originalTitle.toLowerCase().includes(searchText.toLowerCase())) {
        results.push(it);
      } 
    });
    console.log(results);
    return results;
   
  }

}
