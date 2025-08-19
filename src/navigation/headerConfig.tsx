import * as React from 'react';
import _sty from '../assets/Styles';
import _styCommon from '../assets/CommonStyles';
import { AntDesign } from '@expo/vector-icons';

type PropsTintColor = {
    tintColor: string
  }

const BackImage = ({ tintColor }: PropsTintColor) =>
    <AntDesign name="arrowleft" size={24} color={tintColor} style={{ paddingLeft: 8 }} />

export default {
    headerMode: 'float',
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerStyle: _sty.headerStyle,
    headerTitleStyle: _sty.headerTitleStyle,
    headerBackTitleVisible: false,
    headerBackImage: ({ tintColor }: PropsTintColor) => <BackImage tintColor={tintColor} />
}

export const headerPlain = {
    headerMode: 'float',
    headerTintColor: '#000',
    headerTitleAlign: 'center',
    headerStyle: { ..._sty.headerStyle, ..._sty.headerStylePlain },
    headerTitleStyle: { ..._sty.headerTitleStyle, /* paddingLeft:20 */ },
    headerBackTitleVisible: false,
    headerBackImage: ({ tintColor }: PropsTintColor) => <BackImage tintColor={tintColor} />,
}

export const headerDrawer = {
    headerMode: 'float',
    headerTintColor: '#000',
    headerTitleAlign: 'center',
    headerStyle: { ..._sty.headerStyle, ..._sty.headerStyleDrawer },
    headerTitleStyle: { ..._sty.headerTitleStyle, /* paddingLeft:20 */ },
    headerBackTitleVisible: false,
    headerBackImage: ({ tintColor }: PropsTintColor) => <BackImage tintColor={tintColor} />,
}