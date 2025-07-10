import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Card,
  CheckBox,
  Input,
  Layout,
  List,
  ListItem,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  id?: string | string[] | undefined;
  isEditing?: boolean;
};

const ReligiousCommunityForm = ({
  id = undefined,
  isEditing = false,
}: Props) => {
  const [addressInput, setAddressInput] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);

  const setPlatform = Platform.OS === "ios" ? "padding" : "position";

  // Chave da API fornecida pelo usuário
  const GOOGLE_API_KEY = "AIzaSyDUsN2b7eBnkeG78j3Fc71fkketGKrGcGU";

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      authorization: true,
      communityGoogleApiLocalization: {
        lat: 0,
        long: 0,
      },
      communityAddress: {
        fullAddress: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        zipcode: "",
      },
      communityType: "",
      religiousSpaceYearFoundation: "",
      religiousSpaceLeaderFoundation: "",
      religiousSpaceNation: "",
      religiousSpacePraticalLanguages: "",
      religiousSpaceName: "",
      religiousSpaceLeaderName: "",
      religiousSpacePositionName: "",
      religiousSpaceStartedBy: "",
      religiousSpaceNameDateStartedBy: "",
      leaderContacts: {
        phone: "",
        mobile: "",
        email: "",
      },
      leaderEthnicity: "",
      leaderSexOrientation: "",
      leaderEducationalLevel: "",
      leaderSocialProgram: "",
      leaderSufferedRacism: false,
      religiousSpaceMainPicture: "",
    },
  });

  const fetchAddressPredictions = async (input: string) => {
    if (!input || input.length < 3) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsLoading(true);

    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&key=${GOOGLE_API_KEY}&language=pt-BR&components=country:br&types=address`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        setPredictions(data.predictions || []);
        setShowPredictions(true);
      } else {
        console.error("Erro na API:", data.status, data.error_message);
        setPredictions([]);
        setShowPredictions(false);
      }
    } catch (error) {
      console.error("Erro ao buscar predições:", error);
      setPredictions([]);
      setShowPredictions(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlaceDetails = async (placeId: string) => {
    setIsLoading(true);
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}&language=pt-BR&fields=name,formatted_address,geometry,address_components`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const details = data.result;
        handleAddressSelection(details);
      } else {
        console.error("Erro ao buscar detalhes:", data.status);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSelection = (details: any) => {
    const lat = details.geometry?.location?.lat || 0;
    const lng = details.geometry?.location?.lng || 0;

    setValue("communityGoogleApiLocalization", {
      lat: lat,
      long: lng,
    });

    const addressComponents = details.address_components || [];
    let street = "";
    let number = "";
    let neighborhood = "";
    let city = "";
    let state = "";
    let zipcode = "";

    addressComponents.forEach((component: any) => {
      const types = component.types;

      if (types.includes("street_number")) {
        number = component.long_name;
      } else if (types.includes("route")) {
        street = component.long_name;
      } else if (
        types.includes("sublocality") ||
        types.includes("neighborhood")
      ) {
        neighborhood = component.long_name;
      } else if (types.includes("administrative_area_level_2")) {
        city = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        state = component.long_name;
      } else if (types.includes("postal_code")) {
        zipcode = component.long_name;
      }
    });

    setValue("communityAddress", {
      fullAddress: details.formatted_address || "",
      street: street,
      number: number,
      neighborhood: neighborhood,
      city: city,
      state: state,
      zipcode: zipcode,
    });
    setShowPredictions(false);
    setPredictions([]);
  };

  let timeoutId: number | null = null;

  const handleAddressInputChange = (text: string) => {
    setAddressInput(text);

    // Debounce para evitar muitas requisições
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fetchAddressPredictions(text);
    }, 500);
  };

  const handlePredictionPress = (prediction: any) => {
    setAddressInput(prediction.description);
    fetchPlaceDetails(prediction.place_id);
  };

  const clearAddressInput = () => {
    setAddressInput("");
    setPredictions([]);
    setShowPredictions(false);
    setIsLoading(false);
    setValue("communityGoogleApiLocalization", {
      lat: 0,
      long: 0,
    });
    setValue("communityAddress", {
      fullAddress: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipcode: "",
    });
  };

  const ClearButton = (): React.ReactElement => (
    <TouchableOpacity onPress={clearAddressInput}>
      <Ionicons name="close-outline" size={20} />
    </TouchableOpacity>
  );

  const renderPredictionItem = ({ item }: { item: any }) => (
    <ListItem
      title={() => <Text style={{ fontWeight: "bold" }}>{item.structured_formatting?.main_text}</Text>}
      description={() => <Text>{item.structured_formatting?.secondary_text}</Text>}
      onPress={() => handlePredictionPress(item)}
    />
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Layout level="4">
        <View id="authorization">
          <Text style={styles.formTitle}>Autorização de Cadastramento</Text>
          <Controller
            control={control}
            name="authorization"
            rules={{ required: "Autorização é obrigatória" }}
            render={({ field: { onChange, value } }) => (
              <CheckBox checked={value} onChange={onChange}>
                O(A) Senhor(a) autoriza a inclusão da sua casa no Cadastramento?
              </CheckBox>
            )}
          />
        </View>

        <View id="communityLocation">
          <Text category="h6" style={styles.formTitle}>
            Parte I: Localização da Casa Tradicional de Matriz Africana/Terreiro
          </Text>

          <Input
            placeholder="Digite o endereço da comunidade"
            value={addressInput}
            onChangeText={handleAddressInputChange}
            accessoryRight={addressInput.length > 0 ? ClearButton : undefined}
            style={{ marginBottom: 8 }}
            disabled={isLoading}
          />

          {isLoading && (
            <View style={{ alignItems: "center", marginVertical: 8 }}>
              <Spinner size="small" />
              <Text category="c1" appearance="hint" style={{ marginTop: 4 }}>
                Buscando endereços...
              </Text>
            </View>
          )}

          {showPredictions && predictions.length > 0 && (
            <Card style={{ marginTop: 8, maxHeight: 250 }}>
              <List
                data={predictions}
                renderItem={renderPredictionItem}
                keyExtractor={(item) => item.place_id}
              />
            </Card>
          )}
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E4E9F2",
    flex: 1,
    padding: 16,
    alignContent: "center",
    justifyContent: "flex-start",
  },
  placesContainer: {
    flex: 1,
    minHeight: 300,
  },
  formTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default ReligiousCommunityForm;
