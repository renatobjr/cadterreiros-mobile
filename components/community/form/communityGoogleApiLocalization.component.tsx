import CapitionError from "@/components/common/capitionError.component";
import { useGoogleAutocomplete } from "@appandflow/react-native-google-autocomplete";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input, Text } from "@ui-kitten/components";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Masks, useMaskedInputProps } from "react-native-mask-input";

type Props = {
  isEditing?: boolean;
};

const CommunityGoogleApiLocalization = ({ isEditing = false }: Props) => {
  const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  console.log(process.env);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { locationResults, setTerm, clearSearch, searchDetails, term } =
    useGoogleAutocomplete(GOOGLE_MAPS_API_KEY as string, {
      language: "pt-BR",
      debounce: 300,
      queryTypes: "address",
    });

  const handleAddressSelection = async (placeId: string) => {
    const details = await searchDetails(placeId);

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

    clearSearch();
  };

  const clearSearchInput = () => {
    setValue("searchAddress", "");
    setTerm("");
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
    clearSearch();
  };

  const MaskCepProps = useMaskedInputProps({
    mask: Masks.ZIP_CODE,
  });

  return (
    <View style={styles.section} id="communityGoogleApiLocalization">
      <Text category="h6" style={styles.formTitle}>
        Parte I: Localização da Casa Tradicional de Matriz Africana/Terreiro
      </Text>
      <Controller
        control={control}
        name="searchAddress"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite o endereço para buscar"
            value={term}
            onChangeText={setTerm}
            size="large"
            accessoryRight={() => (
              <TouchableOpacity onPress={clearSearchInput}>
                <Ionicons
                  name="close-circle-outline"
                  color={"#222"}
                  size={24}
                />
              </TouchableOpacity>
            )}
          />
        )}
      />
      {locationResults.length > 0 ? (
        <View style={styles.placesContainer}>
          {locationResults.slice(0, 5).map((address, i) => (
            <TouchableOpacity
              key={address.place_id}
              onPress={() => handleAddressSelection(address.place_id)}
              style={{ paddingVertical: 8 }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {address.structured_formatting.main_text}
              </Text>
              <Text style={{ fontWeight: "normal" }}>
                {address.structured_formatting.secondary_text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <></>
      )}

      <View style={{ gap: 8, flexWrap: "wrap", flexDirection: "row" }}>
        <Controller
          control={control}
          name="communityAddress.street"
          rules={
            isEditing
              ? {
                  required: "A rua é obrigatória",
                }
              : {}
          }
          render={({ field: { onChange, value } }) => (
            <Input
              size="large"
              style={{ flex: 3 }}
              placeholder="Rua"
              value={value}
              onChangeText={onChange}
              disabled={!isEditing}
              status={
                (errors.communityAddress as any)?.street ? "danger" : "basic"
              }
              caption={() =>
                (errors.communityAddress as any)?.street?.message ? (
                  <CapitionError
                    message={(errors.communityAddress as any)?.street.message}
                  />
                ) : (
                  <></>
                )
              }
            />
          )}
        />
        <Controller
          control={control}
          name="communityAddress.number"
          rules={{
            required: "O número é obrigatório",
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              size="large"
              textStyle={{ fontSize: 14 }}
              style={{ flex: 1 }}
              placeholder="Número"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              status={
                (errors.communityAddress as any)?.number ? "danger" : "basic"
              }
              caption={() =>
                (errors.communityAddress as any)?.number?.message ? (
                  <CapitionError
                    message={(errors.communityAddress as any)?.number.message}
                  />
                ) : (
                  <></>
                )
              }
            />
          )}
        />
      </View>

      <View style={{ gap: 8, flexWrap: "wrap", flexDirection: "row" }}>
        <Controller
          control={control}
          name="communityAddress.neighborhood"
          rules={
            isEditing
              ? {
                  required: "O bairro é obrigatório",
                }
              : {}
          }
          render={({ field: { onChange, value } }) => (
            <Input
              size="large"
              style={{ flex: 2 }}
              placeholder="Bairro"
              value={value}
              onChangeText={onChange}
              disabled={!isEditing}
              status={
                (errors.communityAddress as any)?.neighborhood
                  ? "danger"
                  : "basic"
              }
              caption={() =>
                (errors.communityAddress as any)?.neighborhood?.message ? (
                  <CapitionError
                    message={
                      (errors.communityAddress as any)?.neighborhood.message
                    }
                  />
                ) : (
                  <></>
                )
              }
            />
          )}
        />
        <Controller
          control={control}
          name="communityAddress.city"
          rules={
            isEditing
              ? {
                  required: "A cidade é obrigatória",
                }
              : {}
          }
          render={({ field: { onChange, value } }) => (
            <Input
              size="large"
              style={{ flex: 2 }}
              placeholder="Cidade"
              value={value}
              onChangeText={onChange}
              disabled={!isEditing}
              status={
                (errors.communityAddress as any)?.city ? "danger" : "basic"
              }
              caption={() =>
                (errors.communityAddress as any)?.city?.message ? (
                  <CapitionError
                    message={(errors.communityAddress as any)?.city.message}
                  />
                ) : (
                  <></>
                )
              }
            />
          )}
        />
      </View>

      <View style={{ gap: 8, flexWrap: "wrap", flexDirection: "row" }}>
        <Controller
          control={control}
          name="communityAddress.state"
          rules={
            isEditing
              ? {
                  required: "O Estado é obrigatório",
                }
              : {}
          }
          render={({ field: { onChange, value } }) => (
            <Input
              size="large"
              style={{ flex: 2 }}
              placeholder="Estado"
              value={value}
              onChangeText={onChange}
              disabled={!isEditing}
              status={
                (errors.communityAddress as any)?.state ? "danger" : "basic"
              }
              caption={() =>
                (errors.communityAddress as any)?.state?.message ? (
                  <CapitionError
                    message={(errors.communityAddress as any)?.state.message}
                  />
                ) : (
                  <></>
                )
              }
            />
          )}
        />
        <Controller
          control={control}
          name="communityAddress.zipcode"
          rules={{ required: "O CEP é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <Input
              maxLength={9}
              size="large"
              style={{ flex: 2 }}
              placeholder="CEP"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              status={
                (errors.communityAddress as any)?.zipcode ? "danger" : "basic"
              }
              caption={() =>
                (errors.communityAddress as any)?.zipcode?.message ? (
                  <CapitionError
                    message={(errors.communityAddress as any)?.zipcode.message}
                  />
                ) : (
                  <></>
                )
              }
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  placesContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  formTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommunityGoogleApiLocalization;
