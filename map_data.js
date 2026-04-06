/**
 * Tamil Nadu District Path Data (Simplified for Performance)
 * Each object represents a district with its coordinate path.
 */
const TAMIL_NADU_MAP_DATA = [
    { id: "Chennai", name: "Chennai", d: "M760,110 L775,115 L780,125 L770,135 L755,130 Z" },
    { id: "Madurai", name: "Madurai", d: "M430,720 L480,720 L480,770 L430,770 Z" },
    { id: "Coimbatore", name: "Coimbatore", d: "M190,480 L240,480 L240,530 L190,530 Z" },
    { id: "The Nilgiris", name: "The Nilgiris", d: "M150,420 L200,420 L200,470 L150,470 Z" },
    { id: "Thanjavur", name: "Thanjavur", d: "M630,680 L680,680 L680,730 L630,730 Z" },
    { id: "Kanyakumari", name: "Kanyakumari", d: "M320,950 L370,950 L370,1000 L320,1000 Z" },
    { id: "Salem", name: "Salem", d: "M380,420 L430,420 L430,470 L380,470 Z" },
    { id: "Erode", name: "Erode", d: "M280,450 L330,450 L330,500 L280,500 Z" },
    { id: "Trichy", name: "Tiruchirappalli", d: "M500,580 L550,580 L550,630 L500,630 Z" },
    { id: "Tiruneleveli", name: "Tirunelveli", d: "M340,850 L390,850 L390,900 L340,900 Z" },
    { id: "Ramnathapuram", name: "Ramanathapuram", d: "M550,820 L650,820 L650,870 L550,870 Z" },
    { id: "Tuticorin", name: "Tuticorin", d: "M420,880 L470,880 L470,930 L420,930 Z" },
    { id: "Ariyalur", name: "Ariyalur", d: "M580,550 L630,550 L630,600 L580,600 Z" },
    { id: "Nagapattinam", name: "Nagapattinam", d: "M720,650 L750,720 L730,730 L700,660 Z" },
    { id: "Tiruvarur", name: "Tiruvarur", d: "M690,690 L720,690 L720,740 L690,740 Z" },
    { id: "Pudukkottai", name: "Pudukkottai", d: "M580,650 L650,650 L650,700 L580,700 Z" },
    { id: "Karur", name: "Karur", d: "M420,580 L470,580 L470,630 L420,630 Z" },
    { id: "Namakkal", name: "Namakkal", d: "M400,500 L450,500 L450,550 L400,550 Z" },
    { id: "Dharmapuri", name: "Dharmapuri", d: "M350,330 L400,330 L400,380 L350,380 Z" },
    { id: "Krishnagiri", name: "Krishnagiri", d: "M300,280 L380,280 L380,330 L300,330 Z" },
    { id: "Vellore", name: "Vellore", d: "M500,220 L600,220 L600,270 L500,270 Z" },
    { id: "Kanchipuram", name: "Kanchipuram", d: "M650,180 L720,180 L720,230 L650,230 Z" },
    { id: "Chengalpattu", name: "Chengalpattu", d: "M730,150 L780,150 L780,200 L730,200 Z" },
    { id: "Tiruvannamalai", name: "Tiruvannamalai", d: "M520,300 L620,300 L620,350 L520,350 Z" },
    { id: "Villupuram", name: "Villupuram", d: "M600,380 L700,380 L700,430 L600,430 Z" },
    { id: "K Kallakurichi", name: "Kallakurichi", d: "M500,420 L580,420 L580,470 L500,470 Z" },
    { id: "Cuddalore", name: "Cuddalore", d: "M710,450 L780,450 L780,500 L710,500 Z" },
    { id: "Theni", name: "Theni", d: "M320,700 L380,700 L380,760 L320,760 Z" },
    { id: "Dindigul", name: "Dindigul", d: "M350,600 L450,600 L450,660 L350,660 Z" },
    { id: "Sivaganga", name: "Sivaganga", d: "M520,720 L600,720 L600,780 L520,780 Z" },
    { id: "Virudhunagar", name: "Virudhunagar", d: "M400,790 L500,790 L500,840 L400,840 Z" },
    { id: "Tenkasi", name: "Tenkasi", d: "M250,820 L320,820 L320,880 L250,880 Z" },
    { id: "Ranipet", name: "Ranipet", d: "M620,240 L680,240 L680,290 L620,290 Z" },
    { id: "Tirupathur", name: "Tirupathur", d: "M450,290 L510,290 L510,340 L450,340 Z" },
    { id: "Tiruppur", name: "Tiruppur", d: "M260,520 L340,520 L340,580 L260,580 Z" },
    { id: "Perambalur", name: "Perambalur", d: "M550,500 L610,500 L610,550 L550,550 Z" },
    { id: "Mayiladuthurai", name: "Mayiladuthurai", d: "M740,600 L790,600 L790,650 L740,650 Z" }
];

window.TAMIL_NADU_MAP_DATA = TAMIL_NADU_MAP_DATA;
