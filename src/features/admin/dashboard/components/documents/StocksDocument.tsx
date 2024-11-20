import { Document, Page, Text, View } from "@react-pdf/renderer";
import { ProductResponseType } from "@features/shared/stocks/types/product.types";
import { createTw } from "react-pdf-tailwind";
import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils";
import FooterDocument from "./FooterDocument";
import HeaderDocument from "./HeaderDocument";

type StocksDocumentProps = {
  stocks: ProductResponseType[];
};

const StocksDocument = ({ stocks }:StocksDocumentProps ) => {
  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ['Helvetica', 'sans-serif'], 
      },
    },
  });

  return (
    <Document>
      <Page size="A4" style={tw('p-12 font-sans')} wrap>
        <HeaderDocument />
        <View style={tw('mb-6 w-full ')}>
          <View style={tw('flex flex-row items-center justify-between mb-6 gap-2')}>
            <Text style={tw('text-md text-green-500 uppercase tracking-tighter text-center font-bold')}>
              Stocks Report
            </Text>
            <Text style={tw('text-sm text-lime-500 uppercase tracking-tighter text-center font-bold')}>
              Generated at {formatISODateWithStringWithSuffix(new Date().toISOString())}
            </Text>
          </View>
          <View style={tw('w-full mb-4 h-full z-50')}>
            {/* Table Header */}
            <View 
            style={tw('flex flex-row text-sm bg-gray-50 py-2')}
            >
              <Text style={tw('w-[25rem] text-start uppercase text-xs tracking-wide')}>ID</Text>
              <Text style={tw('w-[25rem] text-start uppercase text-xs tracking-wide')}>Product Name</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>Quantity</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>Category</Text>
              <Text style={tw('w-[20rem] text-start uppercase text-xs tracking-wide')}>CREATED AT</Text>
            </View>
                   {/* Table Body */}
            {stocks.map((stock) => (
              <View key={stock._id} style={tw('flex flex-row border-b border-gray-200 py-5')}>
                <Text style={tw('w-[25rem] text-xs text-start text-gray-900 uppercase')}>#{stock.productSku || 'N/A'}</Text>
                <Text style={tw('w-[25rem] text-xs text-start text-gray-900 uppercase')}>{stock.productName || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-500 uppercase')}>{(stock.productQuantity) || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-500 uppercase')}>{stock.productCategory || 'N/A'}</Text>
                <Text style={tw('w-[20rem] text-xs text-start text-gray-900 uppercase')}>{formatISODateWithStringWithSuffix(stock.createdAt)}</Text>
              </View>
            ))}

          </View>
        </View>
        <FooterDocument />
      </Page>
    </Document>
  );
};

export default StocksDocument;

    
