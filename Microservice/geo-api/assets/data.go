package assets

type Hotel struct {
	Name string
	Lat  float64
	Lng  float64
}

var Hotels = map[string]Hotel{
	"1":  {"The Grand Delhi", 28.6139, 77.2090},
	"2":  {"Mumbai Marina", 19.0760, 72.8777},
	"3":  {"Chennai Castle", 13.0827, 80.2707},
	"4":  {"Goa Paradise", 15.2993, 74.1240},
	"5":  {"Hyderabad Heights", 17.3850, 78.4867},
	"6":  {"Kolkata Comfort", 22.5726, 88.3639},
	"7":  {"Pune Palace", 18.5204, 73.8567},
	"8":  {"Chennai Castle", 13.0827, 80.2707},
	"9":  {"Ahmedabad Arbour", 23.0225, 72.5714},
	"10": {"Lucknow Lodge", 26.8467, 80.9462},
	"11": {"Jaipur Jewels", 26.9124, 75.7873},
	"12": {"Udaipur View", 24.5854, 73.7125},
	"13": {"Shimla Stay", 31.1048, 77.1734},
	"14": {"Ooty Cottage", 11.4064, 76.6932},
	"15": {"Darjeeling Dream", 27.0360, 88.2627},
}
