export default function AmpListProps(includeDates) {
  return {
    src:
      '/api/search?maxPrice=0' +
      (includeDates ? 'departure=&return=' : '') +
      '&query=&sort=popularity-desc',
    srcBind:
      "'/api/search?maxPrice=' + (display.query_maxPrice < 801 ? display.query_maxPrice : 0) + " +
      (includeDates ? "'&departure=' + display.query_departure +" : '') +
      (includeDates ? "'&return=' + display.query_return +" : '') +
      "'&query=' + display.query_query +" +
      "(display.query_city.length ? '&cities[]=' + display.query_city.join('&cities[]=') : '') +" +
      "(display.query_type.length ? '&types[]=' + display.query_type.join('&types[]=') : '') +" +
      "'&sort=' + display.query_sort",
  };
}
