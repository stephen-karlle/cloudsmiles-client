import { Text, View, Polygon, Path, Svg } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const HeaderDocument = () => {
  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ['Helvetica', 'sans-serif'], 
      },
    },
  });

  return (
    <View style={tw('h-24 border-b border-gray-200 flex flex-row items-center justify-between mb-6 w-full')} fixed>
      <View style={tw('flex items-start justify-start h-full flex-row w-80 h-full ')}>
        <View style={tw('w-12 h-10 ')}>
          <Svg id="a" data-name="Layer 1" viewBox="0 0 1194.39 1626.4" >
            <Polygon points="988.94 764.58 1132.58 764.58 793.26 1626.4 622.04 1626.4 443.53 1111.03 566.35 1111.03 709.99 1528.56 988.94 764.58" fill="#84cc16" />
            <Path d="m183.32,50.56c-227.11,501.78,189.22,765.33,347.66,306.02C619.53,118.6,694.16-13.65,913.67,1.17c226.21,15.27,364.46,232.64,224.26,719.69h-134.67c30.85-69.37,182.83-568.44-100.53-597.46-324.13-28.87-184.8,589.79-609.61,589.79C-24.87,713.19-52.26,262.72,60.5,29.74l122.82,20.82Z" fill="#052e16" />
          </Svg>
        </View>
        <View style={tw('flex flex-col items-center justify-center h-full w-full gap-1 mr-9')}>
          <View style={tw('flex flex-row items-center justify-center h-full w-full gap-1 ')}>
            <Text style={tw(' text-3xl font-bold text-right text-lime-500 ')}>
            VS
            </Text>
            <Text style={tw(' text-3xl font-bold text-right text-green-950')}>
            Dental
            </Text>
          </View>
        </View>
      </View>
      <View style={tw(' w-full flex flex-col h-full justify-center mb-9')}>
        <Text style={tw('w-full text-xs text-right text-gray-900 uppercase')}>Jose Abad Santos Avenue cor Mc Arthur Highway</Text>
        <Text style={tw('w-full text-sm text-right text-gray-900 uppercase')}> Dolores, San Fernando, Philippines</Text>


      </View>
    </View>
  )
}

export default HeaderDocument