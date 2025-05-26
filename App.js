import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

// Cores do tema
const colors = {
  black: '#000000',
  yellow: '#FFD700',  // Dourado
  white: '#FFFFFF',
  darkGray: '#1A1A1A',
  lightGray: '#2E2E2E'
};

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    navigation.navigate('Início');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.loginContainer, {backgroundColor: colors.black}]}
    >
      <SafeAreaView style={styles.loginContent}>
        <StatusBar backgroundColor={colors.black} barStyle="light-content" />
        
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={[styles.loginTitle, {color: colors.yellow}]}>Faça seu login</Text>
        
        <TextInput
          style={[styles.input, {backgroundColor: colors.darkGray, color: colors.white}]}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={[styles.input, {backgroundColor: colors.darkGray, color: colors.white}]}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity
          style={[styles.loginButton, {backgroundColor: colors.yellow}]}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={[styles.loginButtonText, {color: colors.black}]}>Entrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => console.log("Esqueci minha senha")}
          activeOpacity={0.6}
        >
          <Text style={[styles.forgotPassword, {color: colors.yellow}]}>Esqueci minha senha</Text>
        </TouchableOpacity>
        
        <View style={styles.registerContainer}>
          <Text style={[styles.registerText, {color: colors.white}]}>Não tem uma conta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cadastro')}
            activeOpacity={0.6}
          >
            <Text style={[styles.registerLink, {color: colors.yellow}]}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={[styles.container, {backgroundColor: colors.black}]}>
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={{color: colors.white}}>Tela de Cadastro</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{color: colors.yellow}}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.black}]}>
      <StatusBar backgroundColor={colors.black} barStyle="light-content" />
      <View style={styles.content}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, {color: colors.yellow}]}>Bem-vindo à First Class</Text>
        <Text style={[styles.subtitle, {color: colors.white}]}>Descubra a elegância que combina com você</Text>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.yellow}]}
          onPress={() => navigation.navigate('Catálogo')}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, {color: colors.black}]}>Ver Catálogo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function CatalogScreen({ navigation }) {
  const products = [
    {
      id: 1,
      name: "Anel de Ouro",
      price: "R$ 1.200,00",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Colar de Prata",
      price: "R$ 850,00",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Pulseira de Diamante",
      price: "R$ 2.500,00",
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <SafeAreaView style={[styles.catalogContainer, {backgroundColor: colors.black}]}>
      <StatusBar backgroundColor={colors.black} barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.smallLogo}
          resizeMode="contain"
        />
        <Text style={[styles.catalogTitle, {color: colors.yellow}]}>Catálogo de Joias</Text>

        {products.map(product => (
          <View key={product.id} style={[styles.productCard, {backgroundColor: colors.darkGray}]}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <Text style={[styles.productName, {color: colors.white}]}>{product.name}</Text>
            <Text style={[styles.productPrice, {color: colors.yellow}]}>{product.price}</Text>
            <TouchableOpacity
              style={[styles.detailsButton, {backgroundColor: colors.yellow}]}
              activeOpacity={0.7}
            >
              <Text style={[styles.detailsButtonText, {color: colors.black}]}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.backButton, {backgroundColor: colors.yellow}]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, {color: colors.black}]}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.black} // Fundo preto para todas as telas
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} />
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="Catálogo" component={CatalogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Estilos para a logo
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 30,
    resizeMode: 'contain',
    tintColor: '#FFD700' // Cor dourada para a logo
  },
  smallLogo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
    tintColor: '#FFD700'
  },
  
  // Layout
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
  },
  loginContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  
  // Textos
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  catalogTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  // Inputs
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  
  // Botões
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsButton: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontWeight: 'bold',
  },
  backButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  
  // Links
  forgotPassword: {
    textAlign: 'center',
    marginTop: 15,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  
  // Catálogo
  catalogContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  productCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700'
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700'
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});