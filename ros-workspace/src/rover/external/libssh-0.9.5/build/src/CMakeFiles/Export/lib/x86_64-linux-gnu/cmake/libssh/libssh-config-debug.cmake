#----------------------------------------------------------------
# Generated CMake target import file for configuration "Debug".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "ssh" for configuration "Debug"
set_property(TARGET ssh APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(ssh PROPERTIES
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/lib/x86_64-linux-gnu/libssh.so.4.8.6"
  IMPORTED_SONAME_DEBUG "libssh.so.4"
  )

list(APPEND _IMPORT_CHECK_TARGETS ssh )
list(APPEND _IMPORT_CHECK_FILES_FOR_ssh "${_IMPORT_PREFIX}/lib/x86_64-linux-gnu/libssh.so.4.8.6" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
