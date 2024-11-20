import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const FooterDocument = () => {
  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ['Helvetica', 'sans-serif'], 
      },
    },
  });

  return (
    <View style={tw('h-20 border-t border-gray-200 flex flex-row items-center justify-between w-full')} fixed>

    {/* Right Section: Contact Info */}
    <View style={tw('flex flex-col items-start')}>
      <Text style={tw('text-xs text-gray-700 uppercase')}>contact@vsdental.com</Text>
      <Text style={tw('text-xs text-gray-700 uppercase')}>www.vsdental.care</Text>
    </View>

    <View style={tw('flex flex-col items-start uppercase')}>
      <Text style={tw('text-sm text-green-500 uppercase')}>Home of the Radiant Smiles</Text>
    </View>

  </View>
)
}

export default FooterDocument